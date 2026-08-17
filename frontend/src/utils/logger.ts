interface LogContext {
  correlationId?: string;
  [key: string]: any;
}

class Logger {
  private isProduction = import.meta.env.PROD;

  private formatMessage(level: string, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const correlationId = context?.correlationId || 'N/A';
    const contextStr = context ? JSON.stringify(context) : '';
    return `[${timestamp}] [${level}] [CID: ${correlationId}] ${message} ${contextStr}`;
  }

  error(message: string, context?: LogContext): void {
    if (!this.isProduction) {
      console.error(this.formatMessage('ERROR', message, context));
    }
  }

  warn(message: string, context?: LogContext): void {
    if (!this.isProduction) {
      console.warn(this.formatMessage('WARN', message, context));
    }
  }

  info(message: string, context?: LogContext): void {
    if (!this.isProduction) {
      console.info(this.formatMessage('INFO', message, context));
    }
  }

  debug(message: string, context?: LogContext): void {
    if (!this.isProduction) {
      console.debug(this.formatMessage('DEBUG', message, context));
    }
  }
}

export const logger = new Logger();