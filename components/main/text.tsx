import { textMain, textMain_en } from "@/data/texts"

const Text = ({ lang }: { lang: string}) => {

  let text = textMain
  if (lang === 'en') text = textMain_en

  return (
    <section className="text cont">
      {text}
    </section>
  )
}

export default Text