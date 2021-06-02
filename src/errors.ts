export class MissingAuthError extends Error {
  constructor(missingValues = "API ID or API Secret", ...params: string[]) {
    super(...params);
    this.message = `No ${missingValues} configured.`;
  }
}
