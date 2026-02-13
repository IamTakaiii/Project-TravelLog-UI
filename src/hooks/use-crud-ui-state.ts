import { useState, useCallback } from "react";

export function useCrudUiState<T>() {
	const [selectedItem, setSelectedItem] = useState<T | null>(null);
	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);

	const openCreate = useCallback(() => {
		setSelectedItem(null);
		setIsCreateOpen(true);
	}, []);

	const openEdit = useCallback((item: T) => {
		setSelectedItem(item);
		setIsEditOpen(true);
	}, []);

	const openDelete = useCallback((item: T) => {
		setSelectedItem(item);
		setIsDeleteOpen(true);
	}, []);

	const closeAll = useCallback(() => {
		setSelectedItem(null);
		setIsCreateOpen(false);
		setIsEditOpen(false);
		setIsDeleteOpen(false);
	}, []);

	return {
		selectedItem,
		setSelectedItem,
		isCreateOpen,
		setIsCreateOpen,
		isEditOpen,
		setIsEditOpen,
		isDeleteOpen,
		setIsDeleteOpen,
		openCreate,
		openEdit,
		openDelete,
		closeAll,
	};
}
