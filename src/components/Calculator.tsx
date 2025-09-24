'use client'

import { useState, useEffect } from 'react'

// Types
interface CalculationParams {
  fdv: number;
  airdropAllocation: number;
  userScore: number;
  totalScore: number;
}

interface CalculationResults {
  tokenPrice: number;
  userTokens: number;
  userValue: number;
  totalAirdropTokens: number;
}

// Calculation function
function calculateTokenomics(params: CalculationParams): CalculationResults {
  const { fdv, airdropAllocation, userScore, totalScore } = params;
  
  const fdvInDollars = fdv * 1_000_000_000;
  const airdropValue = fdvInDollars * (airdropAllocation / 100);
  const totalSupply = 1_000_000_000;
  const tokenPrice = fdvInDollars / totalSupply;
  const totalAirdropTokens = airdropValue / tokenPrice;
  const userTokens = (userScore / totalScore) * totalAirdropTokens;
  const userValue = userTokens * tokenPrice;
  
  return {
    tokenPrice: parseFloat(tokenPrice.toFixed(6)),
    userTokens: Math.floor(userTokens),
    userValue: parseFloat(userValue.toFixed(2)),
    totalAirdropTokens: Math.floor(totalAirdropTokens)
  };
}

// Main Component
export default function Calculator() {
  const [params, setParams] = useState<CalculationParams>({
    fdv: 2.5,
    airdropAllocation: 25,
    userScore: 60000,
    totalScore: 8500000
  })

  const [results, setResults] = useState(calculateTokenomics(params))

  useEffect(() => {
    setResults(calculateTokenomics(params))
  }, [params])

  const updateParam = (key: keyof CalculationParams, value: number) => {
    setParams(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div style={styles.container}>
      <div style={styles.calculator}>
        {/* Header with Links */}
        <div style={styles.header}>
          <h1 style={styles.title}>EdgeX FDV Calculator v2</h1>
          <div style={styles.subtitleContainer}>
            <p style={styles.subtitle}>Accurate token distribution calculations</p>
          </div>
          <div style={styles.linksContainer}>
            <a 
              href="https://app.edgex.xyz" 
              target="_blank" 
              rel="noopener noreferrer"
              style={styles.tradeLink}
            >
              🚀 Trade on EdgeX
            </a>
            <div style={styles.credit}>
              <span style={styles.creditText}>Designed by: </span>
              <a 
                href="https://twitter.com/trkriptocanavar" 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.twitterLink}
              >
                🐦 TRKriptocanavar
              </a>
            </div>
          </div>
        </div>

        <div style={styles.gridContainer}>
          {/* Controls Section */}
          <div style={styles.controlsSection}>
            {/* FDV Slider (500M - 15B) */}
            <div style={styles.controlGroup}>
              <div style={styles.controlHeader}>
                <label style={styles.controlLabel}>FDV Valuation</label>
                <span style={styles.valueDisplay}>
                  {params.fdv >= 1 ? `${params.fdv}B` : `${params.fdv * 1000}M`}
                </span>
              </div>
              <input 
                type="range" 
                min="0.5" 
                max="15" 
                step="0.1" 
                value={params.fdv}
                onChange={(e) => updateParam('fdv', parseFloat(e.target.value))}
                style={styles.slider}
              />
              <div style={styles.sliderRange}>
                <span>500M</span>
                <span>15B</span>
              </div>
            </div>

            {/* Airdrop Allocation Slider */}
            <div style={styles.controlGroup}>
              <div style={styles.controlHeader}>
                <label style={styles.controlLabel}>Airdrop Allocation</label>
                <span style={{...styles.valueDisplay, background: '#48bb78'}}>
                  {params.airdropAllocation}%
                </span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="30" 
                step="1" 
                value={params.airdropAllocation}
                onChange={(e) => updateParam('airdropAllocation', parseInt(e.target.value))}
                style={styles.slider}
              />
              <div style={styles.sliderRange}>
                <span>20%</span>
                <span>30%</span>
              </div>
            </div>

            {/* Total Score Pool Slider (7M - 10M) */}
            <div style={styles.controlGroup}>
              <div style={styles.controlHeader}>
                <label style={styles.controlLabel}>Total Score Pool</label>
                <span style={{...styles.valueDisplay, background: '#9f7aea'}}>
                  {(params.totalScore / 1_000_000).toFixed(1)}M
                </span>
              </div>
              <input 
                type="range" 
                min="7000000" 
                max="10000000" 
                step="100000" 
                value={params.totalScore}
                onChange={(e) => updateParam('totalScore', parseInt(e.target.value))}
                style={styles.slider}
              />
              <div style={styles.sliderRange}>
                <span>7M</span>
                <span>10M</span>
              </div>
            </div>

            {/* User Score Input */}
            <div style={styles.inputGroup}>
              <div style={styles.inputField}>
                <label style={styles.inputLabel}>Your Score</label>
                <input 
                  type="number" 
                  value={params.userScore}
                  onChange={(e) => updateParam('userScore', parseInt(e.target.value) || 0)}
                  style={styles.input}
                  placeholder="Enter your score"
                />
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div style={styles.resultsSection}>
            <h3 style={styles.sectionTitle}>Calculation Results</h3>
            
            <div style={styles.resultItem}>
              <span style={styles.resultLabel}>Token Price</span>
              <span style={styles.resultValue}>${results.tokenPrice.toFixed(6)}</span>
            </div>
            
            <div style={styles.resultItem}>
              <span style={styles.resultLabel}>Your Tokens</span>
              <span style={styles.resultValue}>
                {results.userTokens.toLocaleString()} tokens
              </span>
            </div>
            
            <div style={styles.resultItem}>
              <span style={styles.resultLabel}>Your Value</span>
              <span style={styles.resultValue}>
                ${results.userValue.toLocaleString()}
              </span>
            </div>
            
            <div style={styles.resultItem}>
              <span style={styles.resultLabel}>Total Airdrop</span>
              <span style={styles.resultValue}>
                {results.totalAirdropTokens.toLocaleString()} tokens
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Clean Modern Styles - Morluklar kaldırıldı
const styles = {
  container: { 
    maxWidth: '1400px', 
    margin: '0 auto', 
    padding: '20px',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', // Açık gri gradient
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  calculator: { 
    background: 'white', 
    borderRadius: '20px', 
    padding: '40px', 
    boxShadow: '0 25px 50px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '1200px',
    border: '1px solid #e2e8f0'
  },
  header: { 
    textAlign: 'center' as const, 
    marginBottom: '40px',
    borderBottom: '2px solid #f0f0f0',
    paddingBottom: '20px'
  },
  title: { 
    color: '#2d3748', 
    fontSize: '2.8rem', 
    marginBottom: '10px',
    fontWeight: '700'
  },
  subtitleContainer: {
    marginBottom: '20px'
  },
  subtitle: { 
    color: '#718096', 
    fontSize: '1.2rem',
    margin: 0
  },
  linksContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '30px',
    flexWrap: 'wrap' as const,
    marginTop: '15px'
  },
  tradeLink: {
    color: '#4299e1',
    fontSize: '1.1rem',
    fontWeight: '600',
    textDecoration: 'none',
    padding: '12px 24px',
    borderRadius: '10px',
    border: '2px solid #4299e1',
    transition: 'all 0.3s ease',
    background: 'transparent',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  credit: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '1rem',
    color: '#718096'
  },
  creditText: {
    color: '#718096'
  },
  twitterLink: {
    color: '#1da1f2',
    textDecoration: 'none',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    background: '#f8fafc',
    transition: 'all 0.3s ease'
  },
  gridContainer: { 
    display: 'grid', 
    gridTemplateColumns: '1fr 1fr', 
    gap: '40px',
    alignItems: 'start'
  },
  controlsSection: { 
    display: 'flex', 
    flexDirection: 'column' as const, 
    gap: '25px' 
  },
  controlGroup: { 
    background: '#f8fafc', 
    padding: '25px', 
    borderRadius: '15px', 
    border: '1px solid #e2e8f0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
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
    padding: '10px 20px', 
    borderRadius: '25px', 
    fontWeight: 'bold', 
    fontSize: '1.1rem',
    minWidth: '80px',
    textAlign: 'center' as const
  },
  slider: { 
    width: '100%', 
    height: '8px', 
    borderRadius: '5px', 
    background: '#e2e8f0',
    outline: 'none', 
    margin: '15px 0',
    WebkitAppearance: 'none'
  },
  sliderRange: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    color: '#718096', 
    fontSize: '0.9rem',
    marginTop: '10px'
  },
  inputGroup: { 
    display: 'grid', 
    gridTemplateColumns: '1fr', 
    gap: '15px' 
  },
  inputField: { 
    display: 'flex', 
    flexDirection: 'column' as const 
  },
  inputLabel: { 
    fontWeight: '600', 
    color: '#2d3748', 
    marginBottom: '8px',
    fontSize: '1.1rem'
  },
  input: { 
    padding: '15px', 
    border: '2px solid #e2e8f0', 
    borderRadius: '10px', 
    fontSize: '1.1rem',
    transition: 'border-color 0.3s ease'
  },
  resultsSection: { 
    background: 'linear-gradient(135deg, #48bb78, #38a169)', 
    color: 'white', 
    padding: '30px', 
    borderRadius: '15px',
    height: 'fit-content',
    boxShadow: '0 10px 30px rgba(72, 187, 120, 0.2)'
  },
  sectionTitle: { 
    textAlign: 'center' as const, 
    marginBottom: '25px', 
    fontSize: '1.6rem',
    fontWeight: '600'
  },
  resultItem: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    background: 'rgba(255,255,255,0.2)', 
    padding: '18px 25px', 
    borderRadius: '12px', 
    marginBottom: '12px', 
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.3)'
  },
  resultLabel: { 
    fontSize: '1.1rem',
    fontWeight: '500'
  },
  resultValue: { 
    fontSize: '1.3rem', 
    fontWeight: 'bold',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }
}

// Slider thumb styles
const sliderStyles = `
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: white;
    border: 3px solid #4299e1;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  }
  
  input[type="range"]::-moz-range-thumb {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: white;
    border: 3px solid #4299e1;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  }
  
  /* Hover effects for links */
  a:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = sliderStyles;
  document.head.appendChild(style);
}