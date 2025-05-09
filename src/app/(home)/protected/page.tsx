const Page = ()=>{
    return (
        <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Protected Page</h1>
        <p className="mt-4 text-lg">You must be signed in to view this page.</p>
        </div>
    )
}
export default Page