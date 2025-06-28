<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['sb3'])) {
    $tmp = $_FILES['sb3']['tmp_name'];
    $filename = 'project_' . time() . '.zip';

    $zip = new ZipArchive;
    if ($zip->open($filename, ZipArchive::CREATE) === TRUE) {
        $zip->addFile($tmp, 'project.sb3');
        $zip->close();

        header('Content-Type: application/zip');
        header('Content-Disposition: attachment; filename="' . $filename . '"');
        readfile($filename);
        unlink($filename);
        exit;
    } else {
        echo "Failed to create zip file.";
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Scratch SB3 Packager</title>
</head>
<body>
    <h2>Upload your .sb3 file to package it as a .zip</h2>
    <form method="POST" enctype="multipart/form-data">
        <input type="file" name="sb3" accept=".sb3" required>
        <button type="submit">Create ZIP</button>
    </form>
</body>
</html>
