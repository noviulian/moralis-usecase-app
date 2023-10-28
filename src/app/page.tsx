"use client";
import Modal from "@/components/Modal";
import { useState } from "react";

export default function Home() {
    const [open, setOpen] = useState<boolean>(false);

    const openModal = () => {
        setOpen(true);
    };
    const closeModal = () => {
        setOpen(false);
    };

    return (
        <div>
            <button onClick={openModal}>openModal</button>
            <Modal open={open} onClose={closeModal}>
                test
            </Modal>
        </div>
    );
}
