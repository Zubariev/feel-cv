/**
 * Payment Success Page
 *
 * Displayed when user returns from Fondy payment.
 * Shows a pending/success state and refreshes entitlements.
 */

import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, ArrowRight, AlertCircle } from 'lucide-react';

interface PaymentSuccessPageProps {
  onContinue: () => void;
  onRefreshEntitlements: () => Promise<void>;
}

export const PaymentSuccessPage: React.FC<PaymentSuccessPageProps> = ({
  onContinue,
  onRefreshEntitlements,
}) => {
  const [status, setStatus] = useState<'loading' | 'success' | 'pending'>('loading');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const checkEntitlements = async () => {
      try {
        // Refresh entitlements to get the latest state
        await onRefreshEntitlements();

        // Wait a bit for webhook to process
        if (retryCount < 3) {
          setTimeout(() => {
            setRetryCount((c) => c + 1);
          }, 2000);
        } else {
          // After 3 retries, assume success (webhook might be delayed)
          setStatus('success');
        }
      } catch (err) {
        console.error('Failed to refresh entitlements:', err);
        setStatus('pending');
      }
    };

    checkEntitlements();
  }, [retryCount, onRefreshEntitlements]);

  useEffect(() => {
    // After initial loading, show success
    if (retryCount >= 1) {
      setStatus('success');
    }
  }, [retryCount]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {status === 'loading' ? (
          <div className="animate-in fade-in duration-500">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-indigo-50 flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-3">
              Processing Your Payment
            </h1>
            <p className="text-slate-600 mb-8">
              Please wait while we confirm your payment...
            </p>
          </div>
        ) : status === 'success' ? (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-50 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-3">
              Payment Successful!
            </h1>
            <p className="text-slate-600 mb-8">
              Thank you for your purchase. Your account has been upgraded and you can now access all your new features.
            </p>

            <button
              onClick={onContinue}
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/25"
            >
              Start Analyzing CVs
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="mt-6 text-sm text-slate-500">
              A confirmation email has been sent to your registered email address.
            </p>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-50 flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-amber-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-3">
              Payment Processing
            </h1>
            <p className="text-slate-600 mb-8">
              Your payment is being processed. This may take a few moments. If your features aren't activated immediately, please refresh the page in a minute.
            </p>

            <button
              onClick={onContinue}
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors"
            >
              Continue to Dashboard
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-400">
            <span>Secure Payment</span>
            <span>7-Day Money Back</span>
            <span>Cancel Anytime</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
