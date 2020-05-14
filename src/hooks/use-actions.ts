import { useDispatch } from 'react-redux';
interface ActionCreators {
    [name: string]: (...args: any) => any;
}
export function useActions<T extends ActionCreators>(actionCreators: T): T {
    const dispatch = useDispatch();
    const pairs = Object.entries(
        actionCreators
    ).map(([name, actionCreator]) => [
        name,
        (...args: any) => dispatch(actionCreator(...args)),
    ]);
    return Object.fromEntries(pairs);
}
