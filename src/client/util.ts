import moment from "moment";
import { Printer, PrinterStatus } from "./index";

export const Print = (status: PrinterStatus, args: any | any[], name?: string): void => {
    const Logger = Printer.config({
        date: Date.now(),
        name: name ?? "",
        status: status ?? PrinterStatus.Debug
    });
    const msg = Array.isArray(args) ? args.join(" ") : args;

    Logger.log(msg);
};

export const Format = (str: string, ...args: any[]): string => {
    return str.replace(/{(\d+)}/g, (match, number) => {
        return typeof args[number] != "undefined" ? args[number] : match;
    });
};

type ExitStatus = "success" | "failure" | "error" | "fatal";
export const Exit = (code: ExitStatus, objective?: string): void => {
    if (code === "success") {
        Print(
            PrinterStatus.Info,
            `Successfully completed at ${Time.now}`
        );
        process.exit(0);
    } else if (code === "failure") {
        Print(
            PrinterStatus.Error,
            `Failed at ${Time.now}`);
        process.exit(1);
    } else if (code === "error") {
        if (!objective) {
            Print(
                PrinterStatus.Error,
                "An error has occurred, but no objective was provided.");
        }

        Print(
            PrinterStatus.Error,
            `Error at ${Time.now}, ${objective} failed.`);
        process.exit(2);
    } else if (code === "fatal") {
        if (!objective) {
            Print(
                PrinterStatus.Error,
                "An error has occurred, but no objective was provided.");
        }

        Print(
            PrinterStatus.Fatal,
            `Fatal error at ${Time.now}, ${objective} failed.`);
        process.exit(3);
    }
};

const timestamper = (value: number) => moment(value).format("Do[ of ]MMMM YYYY[, ]hh:mm:ss.sss A");
export const Time = {
    specific: (value: number) => {
        if (!value) {
            const Print = Printer.config({
                date: Date.now(),
                name: "Time Formatter",
                status: PrinterStatus.Error
            });

            Print.log(`A value is required but wasn't properly provided.`);
        }
    },
    now: timestamper(Date.now())
};