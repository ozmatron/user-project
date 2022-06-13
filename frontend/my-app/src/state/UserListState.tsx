import { createMachine, assign } from 'xstate';
import { UserList } from '../../../../backend/src/types';

enum UpdateStates {
    Loading = "loading",
    Success = "success",
    Error = "error"
}
  
type Context = {
    userList: UserList[]
    loading: boolean;
};
  
type Event =
    | { type: "UPDATE_USER_LIST"; data: UserList[] }
    | { type: "UPDATE_LOADING"; data: boolean };

export const stateMachine = createMachine<Context, Event>({
    initial: UpdateStates.Loading,
    context: { 
        userList: [],
        loading: true,
    },
    states: { 
        [UpdateStates.Loading]: {
            on: {
                UPDATE_USER_LIST: {
                    actions: assign({ 
                        userList: (ctx, event) => event.data,
                    })
                },
                UPDATE_LOADING: {
                    actions: assign({ 
                        loading: (ctx, event) => event.data,
                    })
                }
            }
        },
    },
});