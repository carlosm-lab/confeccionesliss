declare global {
  interface Window {
    renderOptIn?: () => void;
    renderBadge?: () => void;
    merchantWidgetScript?: HTMLElement;
    merchantwidget?: {
      start: (config: {
        merchant_id: number;
        position?: string;
        region?: string;
        [key: string]: unknown;
      }) => void;
    };
    gapi?: {
      load: (service: string, callback: () => void) => void;
      surveyoptin?: {
        render: (config: Record<string, unknown>) => void;
      };
      ratingbadge?: {
        render: (
          container: HTMLElement,
          config: Record<string, unknown>
        ) => void;
      };
    };
  }
}

export {};
