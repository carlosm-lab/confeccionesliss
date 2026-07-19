# Optimización de Datos de Entrega y Bloqueo de Modales — 2026-07-19

---

## TASK-001: Corrección de animación ilógica en el selector de tipo de entrega

### Archivos modificados

- `src/components/cart/DeliveryFormModal.tsx`

### Cambios realizados

- Se modificó la función `handleMethodChange` para que no ejecute la animación de cálculo de tarifa de envío a domicilio (`triggerCalculationAnim`) de forma prematura cuando el usuario hace clic en el botón "A Domicilio".
- Se ajustó el `onChange` del selector de departamento para que la animación de cálculo (`Calculando tarifa de envío para [Departamento]...`) únicamente se dispare una vez que se ha seleccionado un departamento válido y no vacío.

### Estado: COMPLETO ✓

---

## TASK-002: Actualización de advertencia de precios

### Archivos modificados

- `src/components/cart/DeliveryFormModal.tsx`

### Cambios realizados

- Se actualizó el texto del banner de alerta de variación de precios a: _"Los precios se actualizan periódicamente. En caso de alguna variación, confirmaremos el precio antes de procesar tu pedido."_ para dotar de mayor seriedad y claridad informativa a la interfaz del checkout.

### Estado: COMPLETO ✓

---

## TASK-003: Control de scroll en modales y diálogos abiertos

### Archivos modificados

- `src/components/catalogo/ProductDetailClient.tsx`
- `src/components/admin/ConfirmDialog.tsx`
- `src/components/admin/StatDetailModal.tsx`

### Cambios realizados

- Se integró e invocó el hook de utilidad `useBodyScrollLock` en el visualizador de detalle del producto (`ProductDetailClient.tsx`), bloqueando el desplazamiento del body cuando el lightbox de imagen principal (`isImageModalOpen`) o el modal del formulario de WhatsApp de "Pedir ahora" (`isDeliveryModalOpen`) estén activos.
- Se implementó `useBodyScrollLock` en el modal global de confirmación de administrador (`ConfirmDialog.tsx`) y el modal de detalles estadísticos (`StatDetailModal.tsx`) para asegurar que el scroll de fondo quede bloqueado al abrirlos.

### Estado: COMPLETO ✓

---

## TASK-004: Corrección de método de entrega por defecto en el carrito

### Archivos modificados

- `src/components/cart/CartDrawer.tsx`

### Cambios realizados

- Se modificó la propiedad `deliveryMethod` dentro del estado inicial que el carrito (`CartDrawer.tsx`) le pasa a `DeliveryForm` para que por defecto sea una cadena vacía `""` en lugar de `"domicilio"`. Con esto, el modal de entrega en el flujo del carrito se comporta exactamente igual que el modal de "Pedir ahora", forzando al usuario a elegir explícitamente su método preferido (Taller, Punto Medio o Domicilio) antes de mostrar los respectivos subformularios o advertencias de tarifas.

### Estado: COMPLETO ✓
