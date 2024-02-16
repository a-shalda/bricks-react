import Link from 'next/link'

const Footer = async ({ dictionary }: { dictionary: any}) => {

  return (
    <footer className="footer--background">
      <section className="footer cont">

        <div className="footer__upper">

          <div className="footer__upper__column upper--one">
            <ul>
              <li className="footer__upper__column__title">{dictionary["Footer"]["one"]["title"]}</li>
              <li className="footer__upper__column__item"><Link className="footer__upper__column__item__a" href={`/${dictionary["Language"]}/shop/brick_slips`}>{dictionary["Footer"]["one"]["brick_slips"]}</Link></li>
              <li className="footer__upper__column__item"><Link className="footer__upper__column__item__a" href={`/${dictionary["Language"]}/shop/bricks`}>{dictionary["Footer"]["one"]["bricks"]}</Link></li>
              <li className="footer__upper__column__item"><Link className="footer__upper__column__item__a" href={`/${dictionary["Language"]}/shop/thermopanels`}>{dictionary["Footer"]["one"]["thermopanels"]}</Link></li>
              <li className="footer__upper__column__item"><Link className="footer__upper__column__item__a" href={`/${dictionary["Language"]}/shop/fence_caps`}>{dictionary["Footer"]["one"]["fence_caps"]}</Link></li>
              <li className="footer__upper__column__item"><Link className="footer__upper__column__item__a" href={`/${dictionary["Language"]}/shop/clay_pavers`}>{dictionary["Footer"]["one"]["clay_pavers"]}</Link></li>
              <li className="footer__upper__column__item"><Link className="footer__upper__column__item__a" href={`/${dictionary["Language"]}/shop/stair_floor_tile`}>{dictionary["Footer"]["one"]["stair_floor_tile"]}</Link></li>
              <li className="footer__upper__column__item"><Link className="footer__upper__column__item__a" href={`/${dictionary["Language"]}/shop/window_sills`}>{dictionary["Footer"]["one"]["window_sills"]}</Link></li>
              <li className="footer__upper__column__item"><Link className="footer__upper__column__item__a" href={`/${dictionary["Language"]}/shop/mortar`}>{dictionary["Footer"]["one"]["mortar"]}</Link></li>
            </ul>
          </div>

          <div className="footer__upper__column upper--two">
            <ul>
              <li className="footer__upper__column__title">{dictionary["Footer"]["two"]["title"]}</li>
              <li className="footer__upper__column__item"><Link className="footer__upper__column__item__a" href={`/${dictionary["Language"]}/shop/feldhaus_klinker`}>{dictionary["Footer"]["two"]["one"]}</Link></li>
              <li className="footer__upper__column__item"><Link className="footer__upper__column__item__a" href={`/${dictionary["Language"]}/shop/stroeher`}>{dictionary["Footer"]["two"]["two"]}</Link></li>
              <li className="footer__upper__column__item"><Link className="footer__upper__column__item__a" href={`/${dictionary["Language"]}/shop/roben`}>{dictionary["Footer"]["two"]["three"]}</Link></li>
              <li className="footer__upper__column__item"><Link className="footer__upper__column__item__a" href={`/${dictionary["Language"]}/shop/abc_klinkergruppe`}>{dictionary["Footer"]["two"]["four"]}</Link></li>
              <li className="footer__upper__column__item"><Link className="footer__upper__column__item__a" href={`/${dictionary["Language"]}/shop/king_klinker`}>{dictionary["Footer"]["two"]["five"]}</Link></li>
              <li className="footer__upper__column__item"><Link className="footer__upper__column__item__a" href={`/${dictionary["Language"]}/shop/zg`}>{dictionary["Footer"]["two"]["six"]}</Link></li>
              <li className="footer__upper__column__item"><Link className="footer__upper__column__item__a" href={`/${dictionary["Language"]}/shop/quick_mix`}>{dictionary["Footer"]["two"]["seven"]}</Link></li>
              <li className="footer__upper__column__item"><Link className="footer__upper__column__item__a" href={`/${dictionary["Language"]}/shop/perel`}>{dictionary["Footer"]["two"]["eight"]}</Link></li>
            </ul>
          </div>

          <div className="footer__upper__column upper--three"></div>
          <div className="footer__upper__column upper--four"></div>

          <div className="footer__upper__column upper--four" itemScope itemType="https://schema.org/Organization">
            <p className="footer__upper__column__title">{dictionary["Footer"]["contacts"]["title"]}</p>
            <p className="footer__upper__column__contact--name" itemProp="name">{dictionary["Footer"]["contacts"]["one"]}</p>
            <div className="footer__upper__column__title--address" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <p className="footer__upper__column__contact" itemProp="addressLocality">{dictionary["Footer"]["contacts"]["two"]}</p>
              <p className="footer__upper__column__contact" itemProp="streetAddress">{dictionary["Footer"]["contacts"]["three"]}</p>
              <p className="footer__upper__column__contact" itemProp="streetAddress">{dictionary["Footer"]["contacts"]["four"]}</p>
              {/* <p className="footer__upper__column__contact" itemProp="telephone">+7(977)651-1237</p> */}
              {/* <p className="footer__upper__column__contact" itemProp="email">info@bricks.com</p> */}
              <p className="footer__upper__column__contact">{dictionary["Footer"]["contacts"]["five"]}</p>

              <Link href="https://api.whatsapp.com/send?phone=79776511237" target="_blank" className="footer__upper__column__contact__phone_button">
                <img src="/images/icons/whatsapp.svg" className="icon--footer--call" width="24" height="24" alt="heart"/>
              </Link>

              <Link href="https://t.me/a_shalda" target="_blank" className="footer__upper__column__contact__phone_button">
                <img src="/images/icons/telegram.svg" className="icon--footer--call" width="24" height="24" alt="heart"/>
              </Link>

            </div>
          </div>

        </div>

        <div className="footer__lower">

          <div className="footer__lower__left">
            <Link href="https://www.youtube.com/channel/UCZPDt64PY3l6PkXKIWPiBIw" target="_blank">
              <img src="/images/icons/youtube.svg" className="icon--footer" width="24" height="24" alt="heart"/>
            </Link>
          </div>

          {/* <div className="footer__lower__right">
            <p className="footer__lower__right__desc">
              Designed and developed by <Link href="https://shalda.dev" className="signature" target="_blank">Alex Shalda</Link>
            </p>
          </div> */}

        </div>

        </section>
    </footer>
  )
}

export default Footer