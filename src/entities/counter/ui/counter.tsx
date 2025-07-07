import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/shared/ui/button/button';

import { getCounterValue } from '../model/selectors/get-counter-value/get-counter-value';
import { counterActions } from '../model/slice/counter-slice';

export const Counter = () => {
    const dispatch = useDispatch();
    const counterValue = useSelector(getCounterValue);

    const increment = () => {
        dispatch(counterActions.increment());
    };

    const decrement = () => {
        dispatch(counterActions.decrement());
    };

    return (
        <div>
            <h1 data-testid="value-title">{`value: ${counterValue}`}</h1>
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <Button data-testid="increment-btn" onClick={increment}>increment</Button>
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <Button data-testid="decrement-btn" onClick={decrement}>decrement</Button>
        </div>
    );
};
