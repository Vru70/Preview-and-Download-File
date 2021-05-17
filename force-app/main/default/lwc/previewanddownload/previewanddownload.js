/**
 * @author            : Vrushabh Uprikar
 * @last modified on  : 05-17-2021
 * @last modified by  : Vrushabh Uprikar
 * Modifications Log 
 * Ver   Date         Author             Modification
 * 1.0   05-17-2021   Vrushabh Uprikar   Initial Version
**/
import { LightningElement ,api, wire } from 'lwc';
import getFilesByRecordId from '@salesforce/apex/previewDownloadController.getFilesByRecordId';
import { NavigationMixin } from 'lightning/navigation';
export default class Previewanddownload extends NavigationMixin(LightningElement)
{

    @api recordId;
    filesList = [];
    @wire(getFilesByRecordId, { recordId: '$recordId' })
    wiredResult({ data, error })
    {
        if (data)
        {
            console.log(data);
            this.filesList = Object.keys(data).map(item => ({
                "label": data[item],
                "value": item,
                "url": `/sfc/servlet.shepherd/document/download/${item}`
            }))
            console.log(this.filesList);
        }
        if (error) {
            console.log(error)
        }
    }
    previewHandler(event)
    {
        console.log(event.target.dataset.id)
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'filePreview'
            },
            state: {
                selectedRecordId: event.target.dataset.id
            }
        })
    }
}