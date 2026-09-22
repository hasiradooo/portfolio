"use client";

import { Badge } from "@/components/ui/badge";
import { OutlineArrowRight } from "@/icons/Icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod/v4";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "../providers/language-provider";

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.email({ message: "Invalid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  const { dict } = useLanguage();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: ContactFormValues) => {
    const sendMessage = async () => {
      // Get reCAPTCHA token
      const token = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
        { action: 'contact_form' }
      );

      // Send form data with token
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, recaptchaToken: token }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      form.reset();
      return values;
    };

    toast.promise(sendMessage(), {
      loading: dict?.contact?.form?.sending || 'Sending your message...',
      success: (dict?.contact?.form?.successMessage || 'Message sent successfully! Thank you {name}, I\'ll get back to you soon.').replace('{name}', values.name),
      error: dict?.contact?.form?.errorMessage || 'Failed to send message. Please try again or use another contact method.',
      duration: 5000,
    });
  };

  const contactMethods = [
    {
      title: dict?.contact?.otherWays?.email?.title || "Email",
      value: dict?.contact?.otherWays?.email?.value || "kris@rabbittale.co",
      description: dict?.contact?.otherWays?.email?.description || "Best for business inquiries",
      href: "mailto:kris@rabbittale.co",
      icon: "Mail"
    },
    {
      title: dict?.contact?.otherWays?.discord?.title || "Discord",
      value: dict?.contact?.otherWays?.discord?.value || "hasiradoo",
      description: dict?.contact?.otherWays?.discord?.description || "Quick chats and questions",
      href: "https://discord.com/users/569975072417251378",
      icon: "MessageSquare"
    },
    {
      title: dict?.contact?.otherWays?.telegram?.title || "Telegram",
      value: dict?.contact?.otherWays?.telegram?.value || "@hasiradooo",
      description: dict?.contact?.otherWays?.telegram?.description || "I'm here 99% of the time",
      href: "https://t.me/hasiradooo",
      icon: "Send"
    },
    {
      title: dict?.contact?.otherWays?.twitter?.title || "Twitter",
      value: dict?.contact?.otherWays?.twitter?.value || "@hasiradoo",
      description: dict?.contact?.otherWays?.twitter?.description || "Follow my journey",
      href: "https://twitter.com/hasiradoo",
      icon: "Twitter"
    },
    {
      title: dict?.contact?.otherWays?.bsky?.title || "Bsky",
      value: dict?.contact?.otherWays?.bsky?.value || "@hasiradoo.rabbittale.co‬",
      description: dict?.contact?.otherWays?.bsky?.description || "Follow my journey",
      href: "https://bsky.app/profile/hasiradoo.rabbittale.co",
      icon: "Cloud"
    }
  ];

  return (
    <>
      {/* Header */}
      <section id="contact-header" className="mb-12 max-w-screen-xl mx-auto px-0">
        <div className="border-l-4 border-foreground pl-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
            {dict?.contact?.header?.title || "Get in Touch"}
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            {dict?.contact?.header?.description || "Let's discuss your project or just say hello"}
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 mb-6 max-w-screen-xl mx-auto px-0 space-y-6">
        {/* Contact Form */}
        <section>
          <div className="border-l-4 border-black dark:border-white pl-4 mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
              {dict?.contact?.form?.title || "Send a Message"}
            </h2>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {dict?.contact?.form?.fields?.name || "Name"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={dict?.contact?.form?.fields?.namePlaceholder || "Your name"}
                        disabled={isSubmitting}
                        className="w-full px-4 py-2 text-sm border rounded-none focus:ring-2 focus:ring-foreground/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {dict?.contact?.form?.fields?.email || "Email"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={dict?.contact?.form?.fields?.emailPlaceholder || "your@email.com"}
                        disabled={isSubmitting}
                        className="w-full px-4 py-2 text-sm border rounded-none focus:ring-2 focus:ring-foreground/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {dict?.contact?.form?.fields?.message || "Message"}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        rows={6}
                        placeholder={dict?.contact?.form?.fields?.messagePlaceholder || "Tell me about your project..."}
                        disabled={isSubmitting}
                        className="w-full px-4 py-2 text-sm border rounded-none focus:ring-2 focus:ring-foreground/20 min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                size={"xl"}
                className="w-full"
              >
                {isSubmitting ? (dict?.contact?.form?.sending || "Sending...") : (dict?.contact?.form?.submit || "Send Message")}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                {dict?.contact?.form?.recaptchaNotice || "This site is protected by reCAPTCHA and the Google"}{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
                  {dict?.contact?.form?.privacyPolicy || "Privacy Policy"}
                </a>{" "}
                {dict?.contact?.form?.and || "and"}{" "}
                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
                  {dict?.contact?.form?.termsOfService || "Terms of Service"}
                </a>{" "}
                {dict?.contact?.form?.apply || "apply."}
              </p>
            </form>
          </Form>
        </section>

        {/* Other Ways */}
        <section>
          <div className="border-l-4 border-black dark:border-white pl-4 mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
              {dict?.contact?.otherWays?.title || "Other Ways to Reach Me"}
            </h2>
          </div>

          <div className="space-y-3 px-6">
            {contactMethods.map((method, index) => (
              <Link
                key={index}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-background hover:bg-foreground/[0.02] p-4 sm:p-6 transition-colors border border-border"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                        {method.title}
                      </h3>
                      <Badge variant="secondary" className="text-xs">{method.value}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {method.description}
                    </p>
                  </div>
                  <OutlineArrowRight
                    size={16}
                    className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 group-hover:translate-x-1 transition-all duration-200"
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* Availability */}
          <div className="mt-6">
            <div className="border-l-4 border-black dark:border-white pl-4 mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                {dict?.contact?.availability?.title || "Availability"}
              </h2>
            </div>
            <div className="bg-background px-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {dict?.contact?.availability?.description || "Currently available for new projects and collaborations. I typically respond within 24 hours."}
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
