interface StreamEvent {
  timestamp: number;
  type: string;
  value?: string | number;
}

interface OutputStream {
  name: string;
  id: string;
  events: StreamEvent[];
  pipes: string[];
  inputs: string[];
  isTopLevel: boolean;
}

export type FiddleOutput = OutputStream[];
