import { useTwinStore } from '../../store/useTwinStore'

class AnnotationManager {
  constructor() {
    this.annotations = [
      {
        id: 'ann-1',
        title: 'Chiller 1 Filter Inspection',
        author: 'Sarah Chen (Engineer)',
        severity: 'HIGH', // 'LOW' | 'MEDIUM' | 'HIGH'
        position: [-5, 4, 2],
        date: '2026-07-25',
        comments: 'Quarterly HEPA filter replacement scheduled for Level 2 NOC air intake.',
      },
      {
        id: 'ann-2',
        title: 'Solar Panel Inverter Calibration',
        author: 'David Vance (Ops)',
        severity: 'MEDIUM',
        position: [2, 12, -1],
        date: '2026-07-24',
        comments: 'Verified DC voltage output on rooftop String 4.',
      },
    ]
  }

  addAnnotation(ann) {
    const newAnn = {
      id: `ann-${Date.now()}`,
      author: 'Current User',
      date: new Date().toISOString().split('T')[0],
      ...ann,
    }
    this.annotations.push(newAnn)
    useTwinStore.getState().setAnnotations?.([...this.annotations])
  }

  getAnnotations() {
    return this.annotations
  }
}

export const annotationManager = new AnnotationManager()
