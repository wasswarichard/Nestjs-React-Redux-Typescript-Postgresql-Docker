import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store.ts';
import { decrement, increment, incrementAsync, incrementByAmount } from '../state/Counter/counterSlice.ts';

const Counter = () => {
   const count = useSelector((state: RootState) => state.counter.value);
   const dispatch = useDispatch<AppDispatch>();
   return (
      <div>
         <h2>Counter: {count}</h2>
        <div>
          <button
            onClick={() => {
              dispatch(increment());
            }}
          >
            Increment
          </button>
          <button
            onClick={() => {
              dispatch(decrement());
            }}
          >
            Decrement
          </button>
          <button
            onClick={() => {
              dispatch(incrementByAmount(10));
            }}
          >
            Increment By Amount
          </button>
          <button
            onClick={() => {
              dispatch(incrementAsync(10));
            }}
          >
            Increment By Amount
          </button>
        </div>
      </div>
   );
};

export default Counter;
