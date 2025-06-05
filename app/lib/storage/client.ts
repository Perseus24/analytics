import imageCompression from 'browser-image-compression';
import {v4 as uuidv4} from 'uuid'
import { createSupabaseClient } from '../supabase';

function getStorage() {
    const {storage} = createSupabaseClient()    
    return storage;
}
type UploadProps = {
    file: File;
    bucket: string;
    folder?: string;
}
export async function uploadImage({file, bucket, folder}: UploadProps) {
    const fileName = file.name
    const fileExtension = fileName.slice(fileName.lastIndexOf('.') + 1)
    const path = `${folder ? folder + "/" : ""}${uuidv4()}.${fileExtension}`

    try {
        file = await imageCompression(file, {
            maxSizeMB: 1
        })
    } catch (e){
        console.error(e)
        return {imageUrl: "", error: "Image compression failed"};
    }

    const storage = getStorage()
    const {data, error} = await storage.from(bucket).upload(path, file)

    if(error) {
        return {imageUrl: "", error: "Image upload failed " + error.message};
    }

    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${data?.path}`;

    return {imageUrl, error: ""};

}