import { AllureStep } from 'allure2-js-commons';
import { AllureReporter } from './AllureReporter';

export class StepWrapper {
  constructor(private readonly reporter: AllureReporter, private readonly step: AllureStep) {}

  public startStep(name: string): StepWrapper {
    const step = this.step.startStep(name);
    this.reporter.pushStep(step);
    return new StepWrapper(this.reporter, step);
  }

  public endStep(): void {
    this.reporter.popStep();
    this.step.endStep();
  }

  public run<T>(body: () => T): T {
    return this.step.wrap(body)();
  }
}
