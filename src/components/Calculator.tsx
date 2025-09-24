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
    userScore: 50000,
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
        <div style={styles.header}>
          <h1 style={styles.title}>EdgeX FDV Calculator v2</h1>
          <p style={styles.subtitle}>Accurate token distribution calculations</p>
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

// Styles
const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '20px' },
  calculator: { background: 'white', borderRadius: '20px', padding: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' },
  header: { textAlign: 'center' as const, marginBottom: '30px' },
  title: { color: '#2d3748', fontSize: '2.5rem', marginBottom: '10px' },
  subtitle: { color: '#718096', fontSize: '1.1rem' },
  gridContainer: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' },
  controlsSection: { display: 'flex', flexDirection: 'column' as const, gap: '20px' },
  controlGroup: { background: '#f7fafc', padding: '20px', borderRadius: '15px', border: '1px solid #e2e8f0' },
  controlHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
  controlLabel: { fontWeight: '600', color: '#2d3748', fontSize: '1.1rem' },
  valueDisplay: { background: '#4299e1', color: 'white', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold', fontSize: '1.2rem' },
  slider: { width: '100%', height: '8px', borderRadius: '4px', background: '#cbd5e0', outline: 'none', margin: '10px 0' },
  sliderRange: { display: 'flex', justifyContent: 'space-between', color: '#718096', fontSize: '0.9rem' },
  inputGroup: { display: 'grid', gridTemplateColumns: '1fr', gap: '15px' },
  inputField: { display: 'flex', flexDirection: 'column' as const },
  inputLabel: { fontWeight: '600', color: '#2d3748', marginBottom: '5px' },
  input: { padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem' },
  resultsSection: { background: 'linear-gradient(135deg, #48bb78, #38a169)', color: 'white', padding: '25px', borderRadius: '15px' },
  sectionTitle: { textAlign: 'center' as const, marginBottom: '20px', fontSize: '1.4rem' },
  resultItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.2)', padding: '15px 20px', borderRadius: '10px', marginBottom: '10px', backdropFilter: 'blur(10px)' },
  resultLabel: { fontSize: '1.1rem' },
  resultValue: { fontSize: '1.3rem', fontWeight: 'bold' }
}