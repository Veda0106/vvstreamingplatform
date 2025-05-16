// // // src/app/%28home%29/client.tsx
// "use client";

// import { trpc } from "@/trpc/client";
// export function PageClient() {
//   const [data] = trpc.categories.getMany.useSuspenseQuery();

//   return (
//     <div>
// {JSON.stringify(data)}
// </div>
//   );
  
// }
// // src/app/(home)/client.tsx

// // "use client";
// // import { trpc } from "@/trpc/client";

// // export function PageClient() {
// //   const { data, isLoading, error } = trpc.hello.useQuery({ text: "VedaVerse" });

// //   if (isLoading) return <div>Loading…</div>;
// //   if (error) return <div>Error: {error.message}</div>;

// //   // data.userId is your Clerk ID
// //   return (
// //     <div>
// //       {/* Page Client Says: {data.greeting} */}
// //       {/* <br /> */}
// //       {/* Your Clerk user ID is: <strong>{data.userId ?? "Not signed in"}</strong> */}
// //       Your Clerk user ID is: <strong>{data.userId} | {data.name ?? "Not signed in"}</strong>
// //     </div>
// //   );
// // }