import { useSelector, useDispatch } from "../redux";

export default function Home() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);

  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button>
    </>
  );
}
