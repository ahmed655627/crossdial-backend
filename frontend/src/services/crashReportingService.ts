/**
 * Crash Reporting Service
 * Sentry-style error tracking
 */

import { Platform } from 'react-native';

interface CrashReport {
  error: Error;
  context?: Record<string, any>;
  timestamp: number;
  platform: string;
  deviceInfo?: Record<string, any>;
}

class CrashReportingService {
  private isInitialized = false;
  private userId: string | null = null;
  private crashQueue: CrashReport[] = [];
  private breadcrumbs: string[] = [];
  private maxBreadcrumbs = 50;

  initialize(userId?: string) {
    this.userId = userId || null;
    this.isInitialized = true;
    
    // Set up global error handler
    this.setupGlobalErrorHandler();
    
    console.log('Crash reporting initialized');
  }

  private setupGlobalErrorHandler() {
    // Handle unhandled JS errors
    const originalHandler = ErrorUtils.getGlobalHandler();
    
    ErrorUtils.setGlobalHandler((error, isFatal) => {
      this.captureException(error, { isFatal });
      
      // Call original handler
      if (originalHandler) {
        originalHandler(error, isFatal);
      }
    });
  }

  setUser(userId: string) {
    this.userId = userId;
  }

  addBreadcrumb(message: string) {
    const timestamp = new Date().toISOString();
    this.breadcrumbs.push(`[${timestamp}] ${message}`);
    
    // Keep only last N breadcrumbs
    if (this.breadcrumbs.length > this.maxBreadcrumbs) {
      this.breadcrumbs = this.breadcrumbs.slice(-this.maxBreadcrumbs);
    }
  }

  captureException(error: Error, context?: Record<string, any>) {
    if (!this.isInitialized) {
      console.error('Crash reporting not initialized');
      return;
    }

    const report: CrashReport = {
      error,
      context: {
        ...context,
        user_id: this.userId,
        breadcrumbs: [...this.breadcrumbs],
      },
      timestamp: Date.now(),
      platform: Platform.OS,
      deviceInfo: {
        os: Platform.OS,
        version: Platform.Version,
      },
    };

    this.crashQueue.push(report);
    
    console.error('🚨 Crash captured:', {
      name: error.name,
      message: error.message,
      context,
    });

    // In production, send to crash reporting backend
    // this.sendCrashReport(report);
  }

  captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
    this.addBreadcrumb(`[${level.toUpperCase()}] ${message}`);
    console.log(`[${level}] ${message}`);
  }

  // Wrap async functions with error handling
  wrapAsync<T>(fn: () => Promise<T>, context?: string): Promise<T> {
    return fn().catch((error) => {
      this.captureException(error, { context });
      throw error;
    });
  }

  // Get crash reports for debugging
  getCrashQueue(): CrashReport[] {
    return [...this.crashQueue];
  }

  getBreadcrumbs(): string[] {
    return [...this.breadcrumbs];
  }

  clearCrashQueue() {
    this.crashQueue = [];
  }

  clearBreadcrumbs() {
    this.breadcrumbs = [];
  }
}

export const crashReportingService = new CrashReportingService();
export default crashReportingService;
