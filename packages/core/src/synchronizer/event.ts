export type EventBase = 'change' /* TODO: //| 'applySet' | 'resolveGet' */;
export type EventPrefix = 'pre' | 'post';
export type EventName = `${EventPrefix}${Capitalize<EventBase>}`;
export type EventMethod = `on${Capitalize<EventName>}`;