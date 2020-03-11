import { Machine, assign } from 'xstate';

export const stateMachine = Machine({
  initial: 'idle',
  context: {
    msg: '',
  },
  states: {
    idle: {
      on: {
        SUBMIT: [
          {
            target: 'loading',
            cond: (ctx, event) => event.data.name !== '' && event.data.card !== ''
          },
          {
            target: 'error',
          }
        ]
      }
    },
    loading: {
      invoke: {
        id: 'doPayment',
        src: () => fakePayment(),
        onDone: {
          target: 'success',
          actions: assign({msg: (ctx , event) => event.data}),
        },
        onError: {
          target: 'error',
          actions: assign({msg: (ctx , event) => event.data}),
        }
      }
    },
    error: {
      on: {
        SUBMIT:
        {
          target: 'loading',
          cond: (ctx, event) => event.data.name !== '' && event.data.card !== ''
        }
      }
    },
    success: {
      type: 'final',
    },
  },
});

function fakePayment() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('yaya!!')
    },2500 );
  })
}
