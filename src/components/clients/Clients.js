import styles from './Clients.module.css';
import { clientLogos } from '../../utils/homeText';
import { useEffect } from 'react';

export default function Clients({home}) {

  useEffect(() => {
    const script = document.createElement('script')
    const chartDiv = document.getElementById('homeTickerTape')
    chartDiv.appendChild(script)

    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
    script.async = true
    const loadscript = {
      "symbols": [
        {
          "proName": "FOREXCOM:NSXUSD",
          "title": "US 100"
        },
        {
          "proName": "FX_IDC:EURUSD",
          "title": "EUR/USD"
        },
        {
          "proName": "BITSTAMP:BTCUSD",
          "title": "Bitcoin"
        },
        {
          "proName": "BITSTAMP:ETHUSD",
          "title": "Ethereum"
        },
        {
          "description": "GBPUSD",
          "proName": "FX:GBPUSD"
        },
        {
          "description": "DOGE",
          "proName": "BINANCE:DOGEUSDT"
        },
        {
          "description": "META",
          "proName": "NASDAQ:META"
        }
      ],
      "showSymbolLogo": true,
      "colorTheme": "light",
      "isTransparent": true,
      "displayMode": "regular",
      "locale": "en"
    }

    script.addEventListener('load', loadscript)


    return () => {
      script.removeEventListener('load', loadscript)
    }
  }, [])



  return (
    <div className={styles.container}>
      {home && <div className={styles.logos}>
        {clientLogos.map((logo, index) => (
          <img key={index} src={logo.image} alt="client" />
        ))}
      </div>}
      <div className={`${styles.tvcontainer} tradingview-widget-container__widget`} id="homeTickerTape">
      </div>
    </div>
  )
}




