import { getServerSession } from "next-auth";

const Account = async ({ dictionary }: { dictionary: any }) => {

  const session = await getServerSession()

  return (
    <main className="auth">
      <section className="cont">
        <h1 className="section__title">{dictionary["Account"]["title"]}</h1>
        <p>{dictionary["Account"]["message"]}{session?.user.email}</p>

      </section>
    </main>
  )
}

export default Account