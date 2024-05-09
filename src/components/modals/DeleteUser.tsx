import ModalBase from '@/components/modals/ModalBase';
import { ModalBaseProps } from '@/components/modals/ModalBase';


import { deleteAccount } from '@/services/deleteAccount';
import { Button } from '@/components/ui';
import IconTrash from '@/assets/icons/icon_papelera_black.svg';

export const deleteAccountModals = ({ isOpen, close }: ModalBaseProps) => {


    return(
        <ModalBase isOpen={isOpen} close={close}>
        <Button onClick = {deleteAccount} size="large" bgColor="bg-red_color" extraClass='flex m-auto mt-[10px] justify-start items-center aling-left pl-[15px] bg-red-500'>
            <img src={IconTrash} alt="Plus Icon" className="mr-[28px]" />
                Delete account
            </Button>
        </ModalBase>
    )

}

export default deleteAccount