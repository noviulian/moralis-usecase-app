"use client";

import { ModalProps } from "./types";
import "./Modal.styles.css";
import { useRef } from "react";
export const Modal = ({ open, onClose, children }: ModalProps): JSX.Element => {
    const modalRef = useRef<HTMLDialogElement | null>(null);
    return (
        <dialog
            id="modal"
            className="modal-container"
            open={open}
            ref={modalRef}
            onClick={(e) => {
                if (e.target === modalRef.current) {
                    onClose();
                }
            }}
        >
            <div className="modal-box">
                <h3>hello</h3>
                <p>choose a wallet to connect</p>
                {children}
                {/* <button onClick={() => onClose()}>close</button> */}
            </div>
        </dialog>
    );
};
