import "@/scss/styles.scss";

const Footer = () => {


  return (
    <footer className="footer--background">
      <section className="footer cont">

        <div className="footer__upper">

          <div className="footer__upper__column upper--one">
            <ul>
              <li className="footer__upper__column__title">Categories</li>
              <li className="footer__upper__column__item"><a className="footer__upper__column__item__a" href="/categories/brick_slips.html">Klinker brick slips</a></li>
              <li className="footer__upper__column__item"><a className="footer__upper__column__item__a" href="/categories/bricks.html">Klinker bricks</a></li>
              <li className="footer__upper__column__item"><a className="footer__upper__column__item__a" href="/categories/thermopanels.html">Brick slip thermo panels</a></li>
              <li className="footer__upper__column__item"><a className="footer__upper__column__item__a" href="/categories/fence_caps.html">Ceramic fence caps</a></li>
              <li className="footer__upper__column__item"><a className="footer__upper__column__item__a" href="/categories/clay_pavers.html">Clay pavers</a></li>
              <li className="footer__upper__column__item"><a className="footer__upper__column__item__a" href="/categories/stair_and_floor_tile.html">Stair and floor tile</a></li>
              <li className="footer__upper__column__item"><a className="footer__upper__column__item__a" href="/categories/window_sills.html">Ceramic window sills</a></li>
              <li className="footer__upper__column__item"><a className="footer__upper__column__item__a" href="/categories/mortars.html">Mortars</a></li>
            </ul>
          </div>

          <div className="footer__upper__column upper--two">
            <ul>
              <li className="footer__upper__column__title">Manufacturers</li>
              <li className="footer__upper__column__item"><a className="footer__upper__column__item__a" href="/categories/feldhaus.html">Feldhaus Klinker</a></li>
              <li className="footer__upper__column__item"><a className="footer__upper__column__item__a" href="/categories/stroeher.html">Stroeher</a></li>
              <li className="footer__upper__column__item"><a className="footer__upper__column__item__a" href="/categories/roben.html">Roben</a></li>
              <li className="footer__upper__column__item"><a className="footer__upper__column__item__a" href="/categories/abc-klinkergruppe.html">ABC-Klinkergruppe</a></li>
              <li className="footer__upper__column__item"><a className="footer__upper__column__item__a" href="/categories/king-klinker.html">King Klinker</a></li>
              <li className="footer__upper__column__item"><a className="footer__upper__column__item__a" href="/categories/zg-clinker.html">ZG Clinker</a></li>
              <li className="footer__upper__column__item"><a className="footer__upper__column__item__a" href="/categories/quick-mix.html">Quick Mix</a></li>
              <li className="footer__upper__column__item"><a className="footer__upper__column__item__a" href="/categories/perel.html">Perel</a></li>
            </ul>
          </div>

          <div className="footer__upper__column upper--three"></div>
          <div className="footer__upper__column upper--four"></div>

          <div className="footer__upper__column upper--four" itemScope itemType="https://schema.org/Organization">
            <p className="footer__upper__column__title">Contacts</p>
            <p className="footer__upper__column__contact--name" itemProp="name">Bricks LLC</p>
            <div className="footer__upper__column__title--address" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <p className="footer__upper__column__contact" itemProp="addressLocality">Pittsburgh, USA</p>
              <p className="footer__upper__column__contact" itemProp="streetAddress">5th ave, 100</p>
              <p className="footer__upper__column__contact" itemProp="telephone">+1(555)555555</p>
              <p className="footer__upper__column__contact" itemProp="email">info@bricks.com</p>
              <p className="footer__upper__column__contact">Mon-Sun 09:00-18:00</p>

              <a href="https://api.whatsapp.com/send?phone=79776511237" target="_blank" className="footer__upper__column__contact__phone_button">
                <img src="/images/icons/whatsapp.svg" className="icon--footer--call" width="24" height="24" alt="heart"/>
              </a>

              <a href="https://t.me/a_shalda" target="_blank" className="footer__upper__column__contact__phone_button">
                <img src="/images/icons/telegram.svg" className="icon--footer--call" width="24" height="24" alt="heart"/>
              </a>

            </div>
          </div>

        </div>

        <div className="footer__lower">

          <div className="footer__lower__left">
            <a href="https://www.youtube.com/channel/UCZPDt64PY3l6PkXKIWPiBIw" target="_blank">
              <img src="/images/icons/youtube.svg" className="icon--footer" width="24" height="24" alt="heart"/>
            </a>
          </div>

          <div className="footer__lower__right">
            <p className="footer__lower__right__desc">
              Designed and developed by <a href="https://shalda.dev" className="signature">Alex Shalda</a>
            </p>
          </div>

        </div>

        </section>
    </footer>
  )
}

export default Footer