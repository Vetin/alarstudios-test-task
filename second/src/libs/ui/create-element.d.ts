interface CreateElementPayload {
  tag: keyof HTMLElementTagNameMap | null;
  handlers?: { type: string; fn: EventListenerOrEventListenerObject }[];
  children: Node | HTMLElement[];
  attrs?: Record<string, any>;
  identifier?: string;
}

interface CreateElementResult<E extends HTMLElement = HTMLElement> extends E {
  rerender: (payload: CreateElementPayload) => CreateElementResult<E>;
}

export const createElement: (payload: CreateElementPayload) => CreateElementResult;
