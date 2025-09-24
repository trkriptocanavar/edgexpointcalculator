'use client'

import { useState } from 'react'

export default function Calculator() {
  const [fdv, setFdv] = useState(5)
  const [airdropAllocation, setAirdropAllocation] = useState(25)
  const [userScore, setUserScore] = useState(1000)
  const [totalScore, setTotalScore] = useState(100000)

  const calculateUserTokens = () => {
    const totalAirdropValue = (fdv * 1_000_000_000) * (airdropAllocation / 100)
    const tokenPrice = fdv
    const totalTokens = totalAirdropValue / tokenPrice
    return Math.floor((userScore / totalScore) * totalTokens)
  }

  const calculateUserValue = () => {
    return calculateUserTokens() * fdv
  }

  return (
    <div style={styles.container}>
      <div style={styles.calculator}>
        <div style={styles.header}>
          <h1 style={styles.title}>EdgeX FDV Calculator v2</h1>
          <div style={styles.subtitleContainer}>
            <p style={styles.subtitle}>EdgeX Trade --⏵ • </p>
            <a 
              href="https://pro.edgex.exchange/referral/TRKRIPTOCANAVAR" 
              target="_blank" 
              rel="noopener noreferrer"
              style={styles.tradeLink}
            >
              Trade on EdgeX
            </a>
          </div>
        </div>

        <div style={styles.gridContainer}>
          {/* Sol Taraf - Kontroller */}
          <div>
            {/* FDV Slider */}
            <div style={styles.controlGroup}>
              <div style={styles.controlHeader}>
                <label style={styles.controlLabel}>FDV (Fully Diluted Valuation)</label>
                <span style={styles.valueDisplay}>{fdv}B</span>
              </div>
              <input 
                type="range" 
                min="0.5" 
                max="15" 
                step="0.1" 
                value={fdv}
                onChange={(e) => setFdv(parseFloat(e.target.value))}
                style={styles.slider}
              />
              <div style={styles.sliderRange}>
                <span>0.5B</span>
                <span>15B</span>
              </div>
            </div>

            {/* Airdrop Slider */}
            <div style={{...styles.controlGroup, marginTop: '20px'}}>
              <div style={styles.controlHeader}>
                <label style={styles.controlLabel}>Airdrop Allocation</label>
                <span style={{...styles.valueDisplay, background: '#48bb78'}}>
                  {airdropAllocation}%
                </span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="30" 
                step="1" 
                value={airdropAllocation}
                onChange={(e) => setAirdropAllocation(parseInt(e.target.value))}
                style={styles.slider}
              />
              <div style={styles.sliderRange}>
                <span>20%</span>
                <span>30%</span>
              </div>
            </div>

            {/* Input Alanları */}
            <div style={styles.inputGroup}>
              <div style={styles.inputField}>
                <label style={styles.inputLabel}>User Score</label>
                <input 
                  type="number" 
                  value={userScore}
                  onChange={(e) => setUserScore(Number(e.target.value))}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputField}>
                <label style={styles.inputLabel}>Total Score Pool</label>
                <input 
                  type="number" 
                  value={totalScore}
                  onChange={(e) => setTotalScore(Number(e.target.value))}
                  style={styles.input}
                />
              </div>
            </div>
          </div>

          {/* Sağ Taraf - İstatistikler ve Sonuçlar */}
          <div>
            {/* EdgeX Statistics */}
            <div style={styles.statsSection}>
              <h3 style={styles.sectionTitle}>EdgeX Statistics</h3>
              <div style={styles.statsGrid}>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>$2.4M</div>
                  <div style={styles.statLabel}>Volume</div>
                </div>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>$18.9M</div>
                  <div style={styles.statLabel}>TVL</div>
                </div>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>24.5K</div>
                  <div style={styles.statLabel}>Users</div>
                </div>
              </div>
            </div>

            {/* Calculation Results */}
            <div style={styles.resultsSection}>
              <h3 style={styles.sectionTitle}>Calculation Results</h3>
              <div style={styles.resultItem}>
                <span style={styles.resultLabel}>Token Price</span>
                <span style={styles.resultValue}>${fdv.toFixed(4)}</span>
              </div>
              <div style={styles.resultItem}>
                <span style={styles.resultLabel}>Your Tokens</span>
                <span style={styles.resultValue}>{calculateUserTokens().toLocaleString()}</span>
              </div>
              <div style={styles.resultItem}>
                <span style={styles.resultLabel}>Your Value</span>
                <span style={styles.resultValue}>${calculateUserValue().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px'
  },
  calculator: {
    background: 'white',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    marginTop: '20px'
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '30px'
  },
  title: {
    color: '#2d3748',
    fontSize: '2.5rem',
    marginBottom: '10px'
  },
  subtitleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    flexWrap: 'wrap' as const
  },
  subtitle: {
    color: '#718096',
    fontSize: '1.1rem',
    margin: 0
  },
  tradeLink: {
    color: '#4299e1',
    fontSize: '1.1rem',
    fontWeight: '600',
    textDecoration: 'none',
    padding: '5px 10px',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
    border: '2px solid #4299e1'
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px',
    marginBottom: '30px'
  },
  controlGroup: {
    background: '#f7fafc',
    padding: '20px',
    borderRadius: '15px',
    border: '1px solid #e2e8f0'
  },
  controlHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px'
  },
  controlLabel: {
    fontWeight: '600',
    color: '#2d3748',
    fontSize: '1.1rem'
  },
  valueDisplay: {
    background: '#4299e1',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '1.2rem'
  },
  slider: {
    width: '100%',
    height: '8px',
    borderRadius: '4px',
    background: '#cbd5e0',
    outline: 'none',
    margin: '10px 0'
  },
  sliderRange: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#718096',
    fontSize: '0.9rem'
  },
  inputGroup: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    marginTop: '20px'
  },
  inputField: {
    display: 'flex',
    flexDirection: 'column' as const
  },
  inputLabel: {
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: '5px'
  },
  input: {
    padding: '12px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '1rem'
  },
  statsSection: {
    background: 'linear-gradient(135deg, #4299e1, #667eea)',
    color: 'white',
    padding: '25px',
    borderRadius: '15px',
    marginBottom: '20px'
  },
  sectionTitle: {
    textAlign: 'center' as const,
    marginBottom: '20px',
    fontSize: '1.4rem'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px'
  },
  statItem: {
    background: 'rgba(255,255,255,0.2)',
    padding: '15px',
    borderRadius: '10px',
    textAlign: 'center' as const,
    backdropFilter: 'blur(10px)'
  },
  statValue: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '5px'
  },
  statLabel: {
    fontSize: '0.9rem',
    opacity: 0.9
  },
  resultsSection: {
    background: 'linear-gradient(135deg, #48bb78, #38a169)',
    color: 'white',
    padding: '25px',
    borderRadius: '15px'
  },
  resultItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(255,255,255,0.2)',
    padding: '15px 20px',
    borderRadius: '10px',
    marginBottom: '10px',
    backdropFilter: 'blur(10px)'
  },
  resultLabel: {
    fontSize: '1.1rem'
  },
  resultValue: {
    fontSize: '1.4rem',
    fontWeight: 'bold'
  }
}