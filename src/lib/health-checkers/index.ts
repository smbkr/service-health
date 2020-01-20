import { default as emailService } from './email-service';
import { default as paymentGateway } from './payment-gateway';
import { default as microserviceController } from './microservice-controller';
import { default as transactionMonitor } from './transaction-monitor';

export interface ServiceStatusReport {
  emailService: boolean;
  microserviceController: boolean;
  paymentGateway: boolean;
  transactionMonitor: boolean;
}

export default async function getSystemStatus(): Promise<ServiceStatusReport> {
  const status = await Promise.all([
    emailService(),
    microserviceController(),
    paymentGateway(),
    transactionMonitor(),
  ]);

  return {
    emailService: status[0],
    microserviceController: status[1],
    paymentGateway: status[2],
    transactionMonitor: status[3],
  };
}
