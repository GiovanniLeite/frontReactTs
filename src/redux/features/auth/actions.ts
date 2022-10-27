import { createAction } from '@reduxjs/toolkit';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const persistRehydrate = createAction<any>('persist/REHYDRATE');
