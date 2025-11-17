import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddActionForm from "./AddActionForm";

interface AddActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddActionDialog = ({ open, onOpenChange }: AddActionDialogProps) => {
  const handleSuccess = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">إضافة استثمار أخروي</DialogTitle>
          <DialogDescription className="text-center">
            سجّل عملك الصالح وابنِ أصولك في الجنة
          </DialogDescription>
        </DialogHeader>
        
        <AddActionForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export default AddActionDialog;
