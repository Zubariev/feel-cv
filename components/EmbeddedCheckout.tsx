/**
 * Embedded Checkout Component
 *
 * Uses Fondy's JS SDK to render a payment form embedded in the app.
 * This provides a seamless checkout experience without redirecting to external pages.
 *
 * @see https://github.com/cloudipsp/ipsp-js-sdk
 */

import React, { useEffect, useRef, useState } from 'react';
import { X, CreditCard, ShieldCheck, Lock } from 'lucide-react';
import type { PlanCode } from '../types';

declare global {
  interface Window {
    $checkout: any;
    fondy: any;
  }
}

interface EmbeddedCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  checkoutUrl: string;
  orderId: string;
  planName: string;
  planCode: PlanCode;
  amount: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export const EmbeddedCheckout: React.FC<EmbeddedCheckoutProps> = ({
  isOpen,
  onClose,
  checkoutUrl,
  orderId,
  planName,
  planCode,
  amount,
  onSuccess,
  onError
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isOpen || !checkoutUrl) return;

    // Listen for messages from Fondy iframe
    const handleMessage = (event: MessageEvent) => {
      // Verify origin is from Fondy
      if (!event.origin.includes('fondy.eu') && !event.origin.includes('pay.fondy.eu')) {
        return;
      }

      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

        if (data.type === 'payment_success' || data.order_status === 'approved') {
          onSuccess();
          onClose();
        } else if (data.type === 'payment_error' || data.order_status === 'declined') {
          onError(data.error_message || 'Payment was declined');
        } else if (data.type === 'close' || data.action === 'close') {
          onClose();
        }
      } catch (e) {
        // Not a JSON message, ignore
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [isOpen, checkoutUrl, onSuccess, onError, onClose]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-900 text-white p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-indigo-500 rounded-lg">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Complete Your Purchase</h2>
              <p className="text-indigo-200 text-sm">{planName}</p>
            </div>
          </div>

          <div className="flex items-center justify-between bg-white/10 rounded-lg p-3 mt-4">
            <span className="text-sm text-indigo-100">Total Amount</span>
            <span className="text-2xl font-bold">{amount}</span>
          </div>
        </div>

        {/* Checkout iframe container */}
        <div className="relative bg-slate-50" style={{ minHeight: '400px' }}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <div className="text-center">
                <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-sm text-slate-500">Loading secure payment form...</p>
              </div>
            </div>
          )}

          <iframe
            ref={iframeRef}
            src={checkoutUrl}
            onLoad={handleIframeLoad}
            className="w-full border-0"
            style={{ height: '450px' }}
            title="Fondy Payment Form"
            sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-top-navigation"
          />
        </div>

        {/* Footer - Trust indicators */}
        <div className="bg-white border-t border-slate-200 p-4">
          <div className="flex items-center justify-center gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-500" />
              SSL Encrypted
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              PCI DSS Compliant
            </span>
          </div>
          <p className="text-center text-xs text-slate-400 mt-2">
            Secure payments powered by Fondy
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmbeddedCheckout;
