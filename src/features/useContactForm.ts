import { useState } from 'react';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useSettings } from '../context/SettingsContext';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CONTACT_CHANNELS = [
  'whatsapp',
  'viber',
  'telegram',
  'phone',
] as const;
export type ContactChannel = (typeof CONTACT_CHANNELS)[number];

const CHANNEL_NAMES: Record<ContactChannel, string> = {
  whatsapp: 'WhatsApp',
  viber: 'Viber',
  telegram: 'Telegram',
  phone: 'Phone call',
};

export function useContactForm() {
  const { strings } = useSettings();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [channels, setChannels] = useState<ContactChannel[]>([]);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});

  function toggleChannel(channel: ContactChannel) {
    setChannels(current =>
      current.includes(channel)
        ? current.filter(c => c !== channel)
        : [...current, channel],
    );
  }

  function validate(): boolean {
    const next: typeof errors = {};
    if (!name.trim()) next.name = strings.fieldRequired;
    if (!email.trim()) next.email = strings.fieldRequired;
    else if (!EMAIL_PATTERN.test(email.trim()))
      next.email = strings.emailInvalid;
    if (!phone.trim()) next.phone = strings.fieldRequired;
    else if (!isValidPhoneNumber(phone.trim()))
      next.phone = strings.phoneInvalid;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  const preferred = channels.length
    ? `Preferred contact: ${channels.map(c => CHANNEL_NAMES[c]).join(', ')}`
    : '';

  return {
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    message,
    setMessage,
    channels,
    toggleChannel,
    errors,
    validate,
    values: {
      guestName: name.trim(),
      guestEmail: email.trim(),
      guestPhone: phone.trim(),
      message: [message.trim(), preferred].filter(Boolean).join('\n\n'),
    },
  };
}

export type ContactForm = ReturnType<typeof useContactForm>;
