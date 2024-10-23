import React, {useState} from 'react';
import {useAppSelector, useAppDispatch} from "@/Redux/Hooks";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { toast, Flip } from "react-toastify";
import { updateAttachmentProgramImage } from "@/Redux/Reducers/programsSlice/programsSlice";
import { CardBody, Col, Button } from "reactstrap";
import { FilePond, registerPlugin } from "react-filepond";


registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);

const ImagePreview = () => {

    const dispatch = useAppDispatch();
    const [files, setFiles] = useState<any[]>([]);
    const { selectedProgram } = useAppSelector(state => state.programs);
    const handleUpdateImage = () => {
        if (files.length === 0) {
            toast.error(
                <p className="text-white tx-16 mb-0">{"Veuillez sélectionner une image."}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
            return;
        }

        if (selectedProgram) {
            const imageFile = files[0].file as File;

            dispatch(updateAttachmentProgramImage({ programId: selectedProgram.id, imageFile })).unwrap()
                .then(() => {
                    toast.success(
                        <p className="text-white tx-16 mb-0">{'Ajout de l\'image de couverture effectué avec succès'}</p>,
                        {
                            autoClose: 5000,
                            position: toast.POSITION.TOP_CENTER,
                            hideProgressBar: false,
                            transition: Flip,
                            theme: "colored",
                        }
                    );
                })
                .catch((err) => {
                    toast.error(
                        <p className="text-white tx-16 mb-0">{"Erreur survenue lors de l'ajout de l'image de couverture"}</p>,
                        {
                            autoClose: 5000,
                            position: toast.POSITION.TOP_CENTER,
                            hideProgressBar: false,
                            transition: Flip,
                            theme: "colored",
                        }
                    );
                });
        }
    };

    return (
        <Col lg="12">
            <CardBody>
                <FilePond
                    files={files}
                    allowReorder={true}
                    allowMultiple={false}
                    maxFiles={1}
                    onupdatefiles={setFiles}
                    labelIdle='<span class="filepond--label-action text-danger text-decoration-none">Déposez le fichier ici</span>'
                />
                <Button color="primary" onClick={handleUpdateImage}>
                    Mettre à jour l'image de couverture
                </Button>
            </CardBody>
        </Col>
    );
};

export default ImagePreview;
