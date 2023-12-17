import {
  defer,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const someTestPromise = someTest(3000);
  const someTestPromise1 = someTest(4000);
  const someTestPromise2 = someTest(1000);

  return defer({ someTestPromise, someTestPromise1, someTestPromise2 });
};

export default function Index() {
  const { someTestPromise, someTestPromise1, someTestPromise2 } =
    useLoaderData<typeof loader>();

  return (
    <div>
      This is the static text
      <Suspense fallback={<div>loading...</div>}>
        <Await resolve={someTestPromise}>
          {(someTestPromise) => (
            <div>sometext,{JSON.stringify(someTestPromise)}</div>
          )}
        </Await>
      </Suspense>
      <Suspense fallback={<div>loading 1...</div>}>
        <Await resolve={someTestPromise1}>
          {(someTestPromise) => (
            <div>sometext 1,{JSON.stringify(someTestPromise)}</div>
          )}
        </Await>
      </Suspense>
      <Suspense fallback={<div>loading 2...</div>}>
        <Await resolve={someTestPromise2}>
          {(someTestPromise) => (
            <div>sometext 2 ,{JSON.stringify(someTestPromise)}</div>
          )}
        </Await>
      </Suspense>
      asdsad from new branch
    </div>
  );
}

export const sleep = (ms: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

export const someTest = async (ms: number) => {
  await sleep(ms);

  return "test";
};
