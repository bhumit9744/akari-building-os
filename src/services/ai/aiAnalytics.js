/**
 * AI Building Intelligence Service for Akari Digital Twin Engine
 */

export function analyzeBuildingHealth(telemetry) {
  const anomalies = []
  let healthScore = 98

  // Check HVAC Temperature bounds
  if (telemetry.hvacTemp > 24.5) {
    anomalies.push({
      type: 'WARNING',
      category: 'HVAC',
      message: `Elevated Zone Temperature (${telemetry.hvacTemp} °C). Recommending Chiller 2 boost.`,
    })
    healthScore -= 5
  }

  // Check Grid Power Draw vs Solar Generation
  if (telemetry.powerKw > 20.0 && telemetry.solarGenerationKw < 3.0) {
    anomalies.push({
      type: 'OPTIMIZATION',
      category: 'ENERGY',
      message: `Peak Tariff Active: Consider discharging rooftop battery storage to shave ${telemetry.powerKw} kW grid draw.`,
    })
  }

  // Check Occupancy Ratio
  const occRatio = telemetry.occupancy / (telemetry.maxOccupancy || 120)
  if (occRatio > 0.9) {
    anomalies.push({
      type: 'INFO',
      category: 'OCCUPANCY',
      message: `High Floor Density (${Math.round(occRatio * 100)}%). Increasing fresh air ventilation rate.`,
    })
  }

  return {
    healthScore,
    status: healthScore > 90 ? 'Optimal' : healthScore > 75 ? 'Attention Required' : 'Critical',
    anomalies,
    recommendations: [
      'Pre-cool NOC Server Enclosure before 14:00 peak solar hours.',
      'Schedule quarterly inverter check on Roof Array.',
    ],
  }
}
