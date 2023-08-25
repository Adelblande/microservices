
import { getSession  } from "@auth0/nextjs-auth0";

export default async function Home() {

  const session = await getSession();
  

  if(!session) {
    return (
      <>
        <h1>Hello World</h1>
        <pre>
  
        {JSON.stringify(session, null, 2)}
        </pre>
        <a href="/api/auth/login">Login</a>
      </>
    )
  }

  return (
    <>
      <h1>Hello World</h1>
      <pre>

      {JSON.stringify(session, null, 2)}
      </pre>
      <a href="/api/auth/logout">Logout</a>
    </>
  )
  
}
