import LoanRecordDaos, { ILoanRecordModel } from '../daos/LoanRecordDaos';
import { ILoanRecord } from '../models/LoanRecord';
import { findComponentById, modifyComponent } from './ComponentServices';


export async function generateRecord(record: ILoanRecord): Promise<ILoanRecordModel> {
  try {
    let createdRecord = new LoanRecordDaos(record);
    createdRecord = await createdRecord.save();

    let component = await findComponentById(record.item);
    let records = component.records;

    records = [createdRecord, ...records];

    component.records = records;
    await modifyComponent(component);

    return createdRecord;
  } catch (error) {
    throw error;
  }
}

export async function modifyRecord(record: ILoanRecordModel): Promise<ILoanRecordModel> {
  try {
    let updatedRecord = await LoanRecordDaos.findOneAndUpdate({ _id: record._id }, record, { new: true });
    if (updatedRecord) {
      let component = await findComponentById(record.item);
      let records = component.records;

      records[0] = updatedRecord;

      component.records = records;
      await modifyComponent(component);
      return updatedRecord;
    }

    throw new Error('error');
  } catch (error) {
    throw error;
  }
}

export async function findAllRecords(): Promise<ILoanRecordModel[]> {
  try {
    return await LoanRecordDaos.find();
  } catch (error) {
    throw error;
  }
}

export async function queryRecords(params: { property: string; value: string | Date }): Promise<ILoanRecordModel[]> {
  try {
    return await LoanRecordDaos.find({ [params.property]: params.value }).populate('item').sort('-loanedDate');
  } catch (error) {
    throw error;
  }
}


