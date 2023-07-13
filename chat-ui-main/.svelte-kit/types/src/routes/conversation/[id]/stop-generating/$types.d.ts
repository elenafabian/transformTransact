import type * as Kit from '@sveltejs/kit';

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
type RouteParams = { id: string }
type RouteId = '/conversation/[id]/stop-generating';

export type RequestHandler = Kit.RequestHandler<RouteParams, RouteId>;
export type RequestEvent = Kit.RequestEvent<RouteParams, RouteId>;