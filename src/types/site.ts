// Interface
export interface NavigationItem {
  href: string;
  label: string;
}

// Interface
export interface ProfileLink {
  href: string;
  label: string;
  handle: string;
}

// Interface
// What the Support & Feedback form sends to the support function. `product` is
// a catalogue slug, or "general" for a request about no one product; `website`
// is a field people never see, so anything in it was filled in by a bot.
export interface SupportRequest {
  name: string;
  email: string;
  product: string;
  topic: string;
  subject: string;
  message: string;
  website: string;
}
