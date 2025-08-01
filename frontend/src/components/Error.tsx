function Error({message}: {message: string}) {
    return (
        <div style={{color: "red",marginTop: "0.5rem"}}>
            <h1>{message}</h1>
        </div>
    );
}

export default Error;