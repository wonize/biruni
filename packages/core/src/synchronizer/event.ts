export type EventBase = 'change';
export type EventPrefix = 'pre' | 'post';
export type EventName = EventBase;
export type EventMethod = `on${Capitalize<EventName>}`;
export type EventMap = Record<EventName, unknown[]>;
