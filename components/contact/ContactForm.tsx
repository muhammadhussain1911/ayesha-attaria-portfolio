'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';

const contactSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      toast.success('Message sent successfully! I&apos;ll get back to you soon.');
      reset();
    } catch (error) {
      console.error('[v0] Contact form error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register('fullName')}
            type="text"
            className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg focus:outline-none focus:border-[#4ddcd3] transition-colors"
            placeholder="Ayesha Attaria"
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            {...register('email')}
            type="email"
            className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg focus:outline-none focus:border-[#4ddcd3] transition-colors"
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Company / Organization
          </label>
          <input
            {...register('company')}
            type="text"
            className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg focus:outline-none focus:border-[#4ddcd3] transition-colors"
            placeholder="Your Company"
          />
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Website to Test
          </label>
          <input
            {...register('website')}
            type="url"
            className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg focus:outline-none focus:border-[#4ddcd3] transition-colors"
            placeholder="https://example.com"
          />
          {errors.website && (
            <p className="text-red-500 text-xs mt-1">{errors.website.message}</p>
          )}
        </div>

        {/* Service */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Service Needed <span className="text-red-500">*</span>
          </label>
          <select
            {...register('service')}
            className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg focus:outline-none focus:border-[#4ddcd3] transition-colors bg-white"
          >
            <option value="">Select a service</option>
            <option value="Web App Pentest">Web App Penetration Testing</option>
            <option value="API Security">API Security Testing</option>
            <option value="Attack Surface">Attack Surface Analysis</option>
            <option value="Bug Bounty">Bug Bounty Consultation</option>
            <option value="Other">Other</option>
          </select>
          {errors.service && (
            <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>
          )}
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Budget Range
          </label>
          <select
            {...register('budget')}
            className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg focus:outline-none focus:border-[#4ddcd3] transition-colors bg-white"
          >
            <option value="">Select budget range</option>
            <option value="Under $500">Under $500</option>
            <option value="$500-$1,500">$500–$1,500</option>
            <option value="$1,500-$5,000">$1,500–$5,000</option>
            <option value="$5,000+">$5,000+</option>
            <option value="Discuss">Discuss</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('message')}
          rows={6}
          className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg focus:outline-none focus:border-[#4ddcd3] transition-colors resize-none"
          placeholder="Tell me about your security needs and what you're looking to achieve..."
        ></textarea>
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <span className="animate-spin">⏳</span>
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}
