import QRCode from "qrcode";

export async function generateQrDataUrl(publicUrl: string): Promise<string> {
  return QRCode.toDataURL(publicUrl, {
    errorCorrectionLevel: "M",
    width: 320,
    margin: 2
  });
}
