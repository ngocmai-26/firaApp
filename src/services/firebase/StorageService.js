import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { FBStorage } from '../../app/firebase.config'
class StorageService {
  uploadFile = async (file, folder = 'uploads/') => {
    const folderRef = ref(FBStorage, folder + file.fileName)
    const fileBlob = await this.fetchBlob(file.uri)
    const uploadTask = await uploadBytes(folderRef, fileBlob)
    const downloadUrl = await getDownloadURL(uploadTask.ref)
    return downloadUrl
  }
  uploadFiles = async (files, folder = 'uploads/') => {
    const downloadUrls = []
    for (let file of files) {
      const folderRef = ref(FBStorage, folder + file.fileName)
      const fileBlob = await this.fetchBlob(file.uri)
      const uploadTask = await uploadBytes(folderRef, fileBlob)
      const downloadUrl = await getDownloadURL(uploadTask.ref)
      downloadUrls.push(downloadUrl)
    }
    return downloadUrls
  }
  fetchBlob = async(uri)=>{ const resp = await fetch(uri);  return resp.blob();}
}
export const FBStorageService = new StorageService()
