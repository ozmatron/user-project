import { createMachine, assign } from 'xstate';
import { User } from '../../../../backend/src/types';

enum UpdateStates {
    Loading = "loading",
    Success = "success",
    Error = "error"
}
  
type Context = {
    user: User | null;
    loading: boolean;
    noUserFound: string | null;
};
  
type Event =
    | { type: "UPDATE_USER"; data: User }
    | { type: "UPDATE_LOADING"; data: boolean }
    | { type: "UPDATE_NO_USER"; data: string };

export const stateMachine = createMachine<Context, Event>({
    initial: UpdateStates.Loading,
    context: { 
        user: null, 
        loading: true,
        noUserFound: null
    },
    states: { 
        [UpdateStates.Loading]: {
            on: {
                UPDATE_USER: {
                    actions: assign({ 
                        user: (ctx, event) => event.data,
                    })
                },
                UPDATE_LOADING: {
                    actions: assign({ 
                        loading: (ctx, event) => event.data,
                    })
                },
                UPDATE_NO_USER: {
                    actions: assign({ 
                        noUserFound: (ctx, event) => event.data,
                    })
                },
            }
        },
    },
});